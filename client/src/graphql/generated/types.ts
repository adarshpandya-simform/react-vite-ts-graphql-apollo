export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type MutatedTodo = {
  __typename?: 'MutatedTodo';
  todo?: Maybe<Todo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: MutatedTodo;
  deleteTodo: MutatedTodo;
  updateTodo: MutatedTodo;
};


export type MutationAddTodoArgs = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateTodoArgs = {
  completed: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  completed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  title: Scalars['String']['output'];
};
