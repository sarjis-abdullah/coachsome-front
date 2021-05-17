import { roleData } from "@/data";

let role = {
  superAdmin: roleData.SUPERADMIN,
  admin: roleData.ADMIN,
  coach: roleData.COACH,
  athlete: roleData.ATHLETE,
  staff: roleData.STAFF
};

export default {
  role: { ...role },
  admin: [role.superAdmin, role.admin, role.staff],
  client: [role.athlete, role.coach]
};
