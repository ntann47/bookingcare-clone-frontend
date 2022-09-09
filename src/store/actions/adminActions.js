import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  handleCreateNewUser,
  handleGetAllUser,
  handleDeleteUser,
  editUserService,
  handleGetAllDoctorsService,
  handleSaveDoctorInfoService,
  handleGetAllSpecialtyService,
  handleGetAllClinicService,
} from "../../services/userService";
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (err) {
      dispatch(fetchGenderFail());
      console.log("fetch gender fail:", err);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (err) {
      dispatch(fetchPositionFail());
      console.log("fetch position fail:", err);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (err) {
      dispatch(fetchRoleFail());
      console.log("fetch Role fail:", err);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleCreateNewUser(data);
      if (res && res.errCode === 0) {
        toast.success("A new user has been created successfully!");
        dispatch(createUserSuccess());
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (err) {
      dispatch(createUserFail());
      console.log("crerate user fail:", err);
    }
  };
};
export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllUser("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users));
      } else {
        dispatch(fetchAllUserFail());
      }
    } catch (err) {
      dispatch(fetchAllUserFail());
      toast.success("fetch gender fail");
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data: data,
});
export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
});

export const deleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleDeleteUser(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete user successfully");
        dispatch(deleteUserSuccess());
      } else {
        dispatch(deleteUserFail());
      }
    } catch (err) {
      dispatch(deleteUserFail());
      toast.success("delete user fail");
      console.log("delete user fail:", err);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

//EDIT
export const editUserStart = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        toast.success("edit user successfully");
        dispatch(editUserSuccess());
      } else {
        dispatch(editUserFail());
      }
    } catch (err) {
      dispatch(editUserFail());
      toast.success("edit user fail");
      console.log("edit user fail:", err);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorsFail());
      }
    } catch (err) {
      dispatch(fetchAllDoctorsFail());
      toast.success("fetch gender fail");
    }
  };
};
export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: data,
});
export const fetchAllDoctorsFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
});
//manage doctors info
export const saveDoctorInfoStart = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log(data);
      let res = await handleSaveDoctorInfoService(data);

      if (res && res.errCode === 0) {
        toast.success("successfully");
        dispatch(saveDoctorInfoSuccess());
      } else {
        console.log(res.errCode);
        toast.success("fail");
        dispatch(saveDoctorInfoFail());
      }
    } catch (err) {
      dispatch(saveDoctorInfoFail());
      toast.success("fail");
      console.log("fail:", err);
    }
  };
};
export const saveDoctorInfoSuccess = () => ({
  type: actionTypes.SAVE_DOCTOR_INFO_SUCCESS,
});
export const saveDoctorInfoFail = () => ({
  type: actionTypes.SAVE_DOCTOR_INFO_FAIL,
});

export const fetchAllcodeScheduleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchAllcodeScheduleSuccess(res.data));
      } else {
        dispatch(fetchAllcodeScheduleFail());
      }
    } catch (err) {
      dispatch(fetchAllcodeScheduleFail());
      toast.success("fetch gender fail");
    }
  };
};
export const fetchAllcodeScheduleSuccess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS,
  data: data,
});
export const fetchAllcodeScheduleFail = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAIL,
});
//

export const fetchRequireDoctorInfoStart = () => {
  return async (dispatch, getState) => {
    try {
      let priceRes = await getAllCodeService("PRICE");
      let paymentRes = await getAllCodeService("PAYMENT");
      let provinceRes = await getAllCodeService("PROVINCE");
      let specialtyRes = await handleGetAllSpecialtyService();
      let clinicRes = await handleGetAllClinicService();
      if (
        priceRes &&
        priceRes.errCode === 0 &&
        paymentRes &&
        paymentRes.errCode === 0 &&
        provinceRes &&
        provinceRes.errCode === 0 &&
        specialtyRes &&
        specialtyRes.errCode === 0 &&
        clinicRes &&
        clinicRes.errCode === 0
      ) {
        dispatch(
          fetchRequireDoctorInfoSuccess({
            prices: priceRes.data,
            payments: paymentRes.data,
            provinces: provinceRes.data,
            specialties: specialtyRes.data,
            clinics: clinicRes.data,
          })
        );
      } else {
        dispatch(fetchRequireDoctorInfoFail());
      }
    } catch (err) {
      dispatch(fetchRequireDoctorInfoFail());
      toast.success("fetch gender fail");
    }
  };
};
export const fetchRequireDoctorInfoSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
  data: data,
});
export const fetchRequireDoctorInfoFail = () => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAIL,
});
