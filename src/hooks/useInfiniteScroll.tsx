import { MutableRefObject, useMemo, useRef, useState, useEffect } from 'react';
import { PostListItemType } from 'types/PostItem.types';

export type useInfiniteScrollType = {
  containRef: MutableRefObject<HTMLDivElement | null>;
  postList: PostListItemType[];
};

const NUMBER_OF_ITMES_PER_PAGE = 10;

const useInfiniteScroll = (
  selectedCategory: string,
  posts: PostListItemType[],
): useInfiniteScrollType => {
  const containRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<PostListItemType[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: PostListItemType) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  );

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      setCount(value => value + 1);
      observer.unobserve(entries[0].target);
    });
  }, []);

  useEffect(() => {
    setCount(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (
      NUMBER_OF_ITMES_PER_PAGE * count >= postListByCategory.length ||
      containRef.current === null ||
      containRef.current.children.length === 0 ||
      observer.current === null
    )
      return;

    observer.current.observe(
      containRef.current?.children[containRef.current?.children.length - 1],
    );
  }, [count, selectedCategory]);

  return {
    containRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITMES_PER_PAGE),
  };
};

export default useInfiniteScroll;
