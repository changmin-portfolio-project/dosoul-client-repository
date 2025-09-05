import {
  USER_DOMAIN_GENDER,
  USER_DOMAIN_ROLE,
  USER_DOMAIN_STATUS,
} from "@dosoul/consts";

export function getUserGenderDisplay(type: string): string {
  if (type === USER_DOMAIN_GENDER.FEMALE.value)
    return USER_DOMAIN_GENDER.FEMALE.label;
  if (type === USER_DOMAIN_GENDER.MALE.value)
    return USER_DOMAIN_GENDER.MALE.label;
  if (type === USER_DOMAIN_GENDER.OTHERS.value)
    return USER_DOMAIN_GENDER.OTHERS.label;
  return type;
}

export function getUserRoleDisplay(type: string): string {
  if (type === USER_DOMAIN_ROLE.ROLE_USER) return "사용자";
  if (type === USER_DOMAIN_ROLE.ROLE_ADMIN) return "관리자";

  return type;
}

export function getUserStatueDisplay(type: string): string {
  if (type === USER_DOMAIN_STATUS.ACTIVE) return "활성";
  if (type === USER_DOMAIN_STATUS.DORMANT) return "휴면";
  if (type === USER_DOMAIN_STATUS.SUSPENDED) return "정지";
  if (type === USER_DOMAIN_STATUS.PENDING) return "대기";
  if (type === USER_DOMAIN_STATUS.DELETED) return "삭제";
  if (type === USER_DOMAIN_STATUS.FULL_DELETED) return "완전 삭제";

  return type;
}
