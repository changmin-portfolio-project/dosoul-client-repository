import { ROOM_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { UPLOAD_IMG_MAX_HEIGHT, UPLOAD_IMG_MAX_WIDTH } from "@dosoul/consts";
import { formApi } from "@dosoul/services";
import { resizeImage } from "@dosoul/utils";

export interface RoomImageReq {
  id: string;
  order: number;
}

export interface CreateRoomRequest {
  roomName: string;
  moveInAvailableDate: string;
  desc: string;
  moveinConditionDesc: string;
  deposit: number;
  monthlyRent: number;
  address: string;
  addressDetail: string;
  roomType: string;
  roomCount: number;
  netArea: number;
  roomAmenityDesc: string;
  isActive: boolean;
  roomAmenityIncludedDaos: { amenityCategory: string }[];
  roomAmenityOptionalDaos: { amenityCategory: string }[];
  roomImageDaos: RoomImageReq[];
}

export interface CreateRoomResponse {
  message: string;
  data?: any;
}

export const createRoomByAdmin = async (
  createRoomReq: CreateRoomRequest,
  imageFiles: File[],
): Promise<CreateRoomResponse> => {
  try {
    const formData = new FormData();

    // 기본 정보 추가
    const createRoomReqBlob = new Blob([JSON.stringify(createRoomReq)], {
      type: "application/json",
    });
    formData.append("createRoomReq", createRoomReqBlob);

    // 이미지 파일들 추가
    const resizePromises = imageFiles.map(imageFile => {
      const resizedImage = resizeImage(
        imageFile,
        UPLOAD_IMG_MAX_WIDTH,
        UPLOAD_IMG_MAX_HEIGHT,
      );
      return resizedImage;
    });

    const resizedImages = await Promise.all(resizePromises);
    resizedImages.forEach(resizedImage => {
      formData.append("files", resizedImage);
    });

    return formApi
      .post(ROOM_ADMIN_V1_API_PATH, formData)
      .then(res => {
        console.log(res.data);
        return res.data.data;
      })
      .catch(error => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
