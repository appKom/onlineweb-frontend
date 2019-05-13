import { DateTime } from 'luxon';
import React from 'react';

import { IArticle } from 'articles/models/Article';

import style from './articleView.less';

export interface IProps {
  article: IArticle;
}

export const ArticleByline = ({ article }: IProps) => {
  const { published_date, authors } = article;
  const pubDateTime = DateTime.fromISO(published_date);
  const photographer = article.image.photographer;

  return (
    <div className={style.bylineContainer}>
      <div className={style.byline}>
        <span>Skrevet av </span>
        <p>{authors}</p>
        {photographer ? (
          <>
            <span>Fotograf </span>
            <p>{photographer}</p>
          </>
        ) : null}
        <span>Publisert </span>
        <time dateTime={published_date}>{pubDateTime.toLocaleString()}</time>
      </div>
    </div>
  );
};
