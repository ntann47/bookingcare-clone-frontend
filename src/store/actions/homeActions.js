import actionTypes from "./actionTypes";
import { getTopDoctorsHomeService } from "../../services/userService";
export const fetchTopDoctorsHomeStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorsHomeService(12);
      if (res && res.errCode === 0) {
        console.log(res.data);
        dispatch(fetchTopDoctorsHomeSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorsHomeFail());
      }
    } catch (err) {
      dispatch(fetchTopDoctorsHomeFail());
      console.log("fetch top doctors fail:", err);
    }
  };
};
export const fetchTopDoctorsHomeSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_HOME_SUCCESS,
  data: data,
});
export const fetchTopDoctorsHomeFail = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_HOME_FAIL,
});
