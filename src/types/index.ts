export type BlockListItem = {
  title: string;
  value: string;
  icon?: React.FC;
  className?: string;
};

export type WidgetListItem = {
  continent: string;
  stakeSizes: string;
};

export interface ISearch {
  value: string;
  setValue: any;
}

export interface INode {
  info: {
    [key: string]: any;
  };
  stats: {
    [key: string]: any;
  };
  geo: {
    [key: string]: any;
  };
  readable: {
    [key: string]: any;
  };
}
