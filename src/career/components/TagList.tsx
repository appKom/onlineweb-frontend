import React from 'react';
import Tag from './Tag';
import { ITag, Tags, TagWrapper } from '../models/Tag'

export interface ITagListProps {
  handleChange: Function
  heading: string
  tags: TagWrapper
}

const TagList = ({ tags, handleChange, heading }: ITagListProps) => (
  <div>
    <h3>{heading}</h3>
    <div className="TagContainer">
      {Object.keys(tags).map((id: string) => (
        <Tag
          key={id}
          changeKey={id}
          selected={tags[id].display}
          handleChange={handleChange}
          title={tags[id].name}
        />
      ))}
    </div>
  </div>
);

export default TagList;