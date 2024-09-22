export const toastify = (data) => ({ type: "TOASTIFY", data })

const initialState = ({
  isToast: false,
});

const toast = (state = initialState, action) => {
  switch (action.type) {
    case "TOASTIFY":
      return { ...state, data: action.data };

    default:
      return { ...state };
  }
};

export default toast;
