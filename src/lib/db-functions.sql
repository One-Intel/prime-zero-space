-- Function to set organization context
CREATE OR REPLACE FUNCTION set_organization_context(org_id UUID)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_organization_id', org_id::text, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get current organization context
CREATE OR REPLACE FUNCTION get_current_organization_id()
RETURNS UUID AS $$
BEGIN
  RETURN current_setting('app.current_organization_id', true)::UUID;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to check subscription limits
CREATE OR REPLACE FUNCTION check_organization_limits()
RETURNS trigger AS $$
DECLARE
  org_record RECORD;
  current_count INTEGER;
BEGIN
  -- Get organization details
  SELECT * INTO org_record FROM organizations WHERE id = NEW.organization_id;
  
  -- Check user limits for user table
  IF TG_TABLE_NAME = 'users' THEN
    SELECT COUNT(*) INTO current_count FROM users WHERE organization_id = NEW.organization_id;
    IF current_count >= org_record.max_users THEN
      RAISE EXCEPTION 'Organization has reached maximum user limit';
    END IF;
  END IF;
  
  -- Check device limits for device_status table
  IF TG_TABLE_NAME = 'device_status' THEN
    SELECT COUNT(*) INTO current_count FROM device_status WHERE organization_id = NEW.organization_id;
    IF current_count >= org_record.max_devices THEN
      RAISE EXCEPTION 'Organization has reached maximum device limit';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for limit checking
CREATE TRIGGER check_user_limits
  BEFORE INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION check_organization_limits();

CREATE TRIGGER check_device_limits
  BEFORE INSERT ON device_status
  FOR EACH ROW
  EXECUTE FUNCTION check_organization_limits();

-- Function to log organization changes
CREATE OR REPLACE FUNCTION log_organization_changes()
RETURNS trigger AS $$
BEGIN
  INSERT INTO organization_audit_logs (
    organization_id,
    action,
    actor_id,
    changes,
    ip_address,
    user_agent
  ) VALUES (
    NEW.id,
    TG_OP,
    current_setting('request.jwt.claims', true)::json->>'sub',
    jsonb_build_object(
      'old_data', to_jsonb(OLD),
      'new_data', to_jsonb(NEW),
      'changed_at', NOW()
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for organization audit logging
CREATE TRIGGER log_organization_changes
  AFTER INSERT OR UPDATE OR DELETE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION log_organization_changes();

-- Create indexes for better performance
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_alerts_organization_id ON alerts(organization_id);
CREATE INDEX idx_device_status_organization_id ON device_status(organization_id);
CREATE INDEX idx_timetable_templates_organization_id ON timetable_templates(organization_id);
CREATE INDEX idx_audit_logs_organization_id ON organization_audit_logs(organization_id);
CREATE INDEX idx_organizations_domain ON organizations(domain);
CREATE INDEX idx_organizations_subscription_tier ON organizations(subscription_tier);
CREATE INDEX idx_organizations_status ON organizations(status);
