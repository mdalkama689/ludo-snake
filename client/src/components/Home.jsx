import React, { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { token } from "../config";
import axiosInstance from "../helper/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const response = await axiosInstance.post(
        "/create-room",
        { roomName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const roomId = (response.data.roomId).toString()
        navigate(`/ludo/${roomId}`, {state: {type: 'host', roomId}});
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const response = await axiosInstance.post(
        "/check-room",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate(`/ludo/${roomId}`, {state: {type: 'player', roomId}});
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      console.log(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const roomValue = toggle ? "room-id" : "room-name";

  return (
    <div >
      <div className="h-screen w-full flex items-center justify-center flex-col bg-black">
        <div className=" w-[400px] bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {toggle ? "Join the toom" : "Create your room"}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={toggle ? handleJoinRoom : handleCreateRoom}
            >
              <div>
                <label
                  htmlFor={roomValue}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                ></label>
                <Input
                  type="text"
                  placeholder={roomValue}
                  name={roomValue}
                  onChange={(e) =>
                    toggle
                      ? setRoomId(e.target.value)
                      : setRoomName(e.target.value)
                  }
                  value={toggle ? roomId : roomName}
                  disabled={isLoading}
                />
              </div>

              <Button
                disabled={isLoading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                text={toggle ? "Join Room" : "Create Room"}
              />
            </form>

            {toggle ? (
              <div className="flex items-center justify-center">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Create your room?
                </p>

                <Button
                  className="font-medium text-sm ml-0.5 text-blue-500 text-primary hover:underline dark:text-primary-dark"
                  onClick={() => setToggle(!toggle)}
                  text="Create"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Want to join the room?{" "}
                </p>
                <Button
                  className="font-medium text-sm ml-0.5 text-blue-500 text-primary hover:underline dark:text-primary-dark"
                  text="Join"
                  onClick={() => setToggle(!toggle)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
