import React from 'react';
import { Header, Form, Button, Label, Input } from './SearchBar.Styled';

export const SearchBar = ({ onSubmit }) => {
  return (
    <Header>
      <Form>
        <Button type="submit" onClick={onSubmit}>
          <Label>Search</Label>
        </Button>

        <Input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};
