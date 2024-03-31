import Postmate from 'postmate';

export const initPostmate = async(options: Postmate.PostmateOptions) => {
  // Kick off the handshake with the iFrame
  const child = new Postmate(options);
  return child
}



