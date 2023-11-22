import axios from "axios";

const EditProfileService = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_NEXTTECH_DEV_URL}/edit-profile-picture`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Server error", error);
    return { error: "Server error occurred" }; // Return an error object
  }
};

export default EditProfileService;
