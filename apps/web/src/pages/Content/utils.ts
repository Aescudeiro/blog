import { GetContentQuery } from '../../gql/graphql';

type NonNullable<T> = Exclude<T, null | undefined>;

export type Content = NonNullable<GetContentQuery['content']>;

export type ContentTree = Content & {
  childs: ContentTree[];
};

export const contentTreeBuilder = (
  childs: Content[],
  parentId: string | null
) => {
  const childrens: ContentTree[] = [];

  childs.map((child) => {
    if (child.parentId === parentId) {
      childrens.push(
        Object.assign(child, {
          childs: contentTreeBuilder(childs, child.id),
        })
      );
    }
  });

  return childrens;
};
