import { ROOM_ADMIN_V1_API_PATH } from "@/global/const/apipath/v1/RoomAdminV1ApiPath";
import { UPLOAD_IMG_MAX_HEIGHT, UPLOAD_IMG_MAX_WIDTH } from "@dosoul/consts";
import { formApi } from "@dosoul/services";
import { resizeImage } from "@dosoul/utils";

export interface UpdateRoomDetailRequest {
  roomName: string;
  roomType: string;
  roomCount: number;
  moveInAvailableDate: string;
  desc: string;
  moveinConditionDesc: string;
  deposit: number;
  monthlyRent: number;
  address: string;
  addressDetail: string;
  netArea: number;
  roomAmenityDesc: string;
  isActive: boolean;
  roomAmenityIncludedDaos: { amenityCategory: string }[];
  roomAmenityOptionalDaos: { amenityCategory: string }[];
  roomCustomImageDaos: RoomCustomImageReq[];
}

export interface RoomCustomImageReq {
  id: string;
  isFile: boolean;
  imagePath: string | null;
  order: number;
}

export interface RoomCustomImage extends RoomCustomImageReq {
  file: File | null;
}

export interface UpdateRoomDetailResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const updateRoomDetailByAdmin = async (
  roomId: string,
  updateRoomDetailReq: UpdateRoomDetailRequest,
  imageFiles: File[],
): Promise<UpdateRoomDetailResponse> => {
  try {
    const formData = new FormData();

    // 기본 정보 추가
    const updateRoomDetailReqBlob = new Blob(
      [JSON.stringify(updateRoomDetailReq)],
      {
        type: "application/json",
      },
    );
    formData.append("updateRoomDetailReq", updateRoomDetailReqBlob);

    // 새로운 이미지 파일들 추가
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
      .put(`${ROOM_ADMIN_V1_API_PATH}/${roomId}`, formData)
      .then(res => {
        return res.data.data;
      })
      .catch(error => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
