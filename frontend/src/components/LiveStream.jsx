import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
const LiveStream = () => {
  const { randomId } = useParams();
  // const { tutorInfo } = useSelector((state) => state.tutorAuth);

  const myMeeting = async (element) => {
    const appID = 1226487441;
    const serverSecret = "9d169ffb1b4e76987977c7ce2f97b8b8";
    const roomID = randomId;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "Tutor"
    );
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
    });
  };

  return (
    <div className="mt-[6%] mb-10 w-full h-auto">
      <div className=" ">
        <div className="h-screen " ref={myMeeting} />
      </div>
    </div>
  );
};

export default LiveStream;
