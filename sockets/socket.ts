import { Socket } from "socket.io";
import socketIO from "socket.io";

export const disconnect = (client: Socket) => {
  client.on("disconnect", () => {
    console.log("client disconnected");
  });
};

export const sendAnalytics = (io: socketIO.Server) => {
  // let data = [Math.random() * 10, Math.random() * 100];
  // io.emit("number-of-viewers", data);
};
