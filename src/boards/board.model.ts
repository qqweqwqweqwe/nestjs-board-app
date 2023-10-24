export interface Board{
  id :string
  title : string
  description : string
  status : BoardStatus // 공개글인지 비공개글인지

}

export enum BoardStatus{
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'

}