import { atom } from "recoil";

interface IMemo {
  id: string;
  text: string;
}
interface IMemoStorageState {
  finished: (IMemo | null)[];
  todo: (IMemo | null)[];
  willdo: (IMemo | null)[];
}
export const memoStorageState = atom<IMemoStorageState>({
  key: "memoState",
  default: {
    finished: [{ id: "1", text: "finished task place here" }],
    todo: [{ id: "2", text: "todo task place here" }],
    willdo: [{ id: "3", text: "tasks for tomorrow or later place here" }],
  },
});
