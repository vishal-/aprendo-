export const ChallengeState = {
  Stopped: "stopped",
  Ready: "ready",
  Running: "running",
  TimeUp: "timeup",
  Finished: "finished"
};

export type ChallengeStateType =
  (typeof ChallengeState)[keyof typeof ChallengeState];
