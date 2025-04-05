import React from 'react';
const Profile = () => {
  return (
    <div className="flex flex-col align-center flex-1 bg-orange-500">
      {/* <div className="xs:w-5 xs:h-5 sm:w-[20rem] sm:h-[35rem] lg:w-[30rem] lg:h-[40rem] bg-yellow-400"></div> */}
      <img
        src="https://www.w3schools.com/w3images/lights.jpg"
        alt="Profile"
        className="relative top-1/8 left-10
        sm:h-[150px] sm:w-[150px]
        md:w-[250px] md:h-[250px]
        lg:w-[350px] lg:h-[350px] rounded-lg shadow-md hover:shadow-lg"
      ></img>
    </div>
  );
};
export default Profile;
