export interface Block {
  type: 'meaning' | 'slbl' | 'pre' | 'tip' | 'warn' | 'table';
  html?: string;
  text?: string;
  cls?: string;
}

export interface Entry {
  fnName: string;
  badgeCls: string;
  badgeText: string;
  open: boolean;
  blocks: Block[];
}

export type SectionData = Record<string, Entry[]>;
