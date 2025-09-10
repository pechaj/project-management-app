export type project = {
  code: string;
  name: string;
  notes: string;
  deleted: boolean;
  tasks: Record<string, string>;
};
