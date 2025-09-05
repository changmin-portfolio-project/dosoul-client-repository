import {
  ROOM_DOMAIN_TYPE,
  ROOM_MOVE_IN_DOMAIN_STATUS,
  ROOM_MOVE_OUT_DOMAIN_STATUS,
} from "@dosoul/consts";

export function getRoomTypeDisplay(type: string): string {
  if (type === ROOM_DOMAIN_TYPE.SINGLE.value)
    return ROOM_DOMAIN_TYPE.SINGLE.label;
  if (type === ROOM_DOMAIN_TYPE.SHARE.value)
    return ROOM_DOMAIN_TYPE.SHARE.label;
  if (type === ROOM_DOMAIN_TYPE.ONE_ROOM.value)
    return ROOM_DOMAIN_TYPE.ONE_ROOM.label;
  if (type === ROOM_DOMAIN_TYPE.TWO_ROOM.value)
    return ROOM_DOMAIN_TYPE.TWO_ROOM.label;

  return type;
}

export function getRoomMoveinStatusDisplay(type: string): string {
  // ROOM_MOVE_IN_DOMAIN_STATUS의 모든 값들을 순회하면서 일치하는 것을 찾음
  const statusEntry = Object.values(ROOM_MOVE_IN_DOMAIN_STATUS).find(
    status => status.value === type,
  );

  return statusEntry ? statusEntry.label : type;
}

export function getRoomMoveoutStatusDisplay(type: string): string {
  const statusEntry = Object.values(ROOM_MOVE_OUT_DOMAIN_STATUS).find(
    status => status.value === type,
  );

  return statusEntry ? statusEntry.label : type;
}
