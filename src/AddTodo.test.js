import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element); 

  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});


  fireEvent.click(element); 


  expect(screen.getAllByText(/History Test/i).length).toEqual(1); 


 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element); 

  expect(screen.queryByText("05/30/2023")).toBeNull(); 


 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element); 

  expect(screen.queryByText(/History Test/i)).toBeNull(); 
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.click(element); 

  const checkbox = screen.getByRole('checkbox'); 
  fireEvent.click(checkbox); 


  expect(screen.queryByText(/History Test/i)).toBeNull(); 

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2020"}});
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.click(element); 

  const historyColor = screen.getByTestId(/History Test/i).style.background; 

  expect(historyColor).toBe('red'); 

  fireEvent.change(inputTask, { target: { value: "Math Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element); 

  const mathColor = screen.getByTestId(/Math Test/i).style.background; 

  expect(mathColor).toBe('white'); 


 });
