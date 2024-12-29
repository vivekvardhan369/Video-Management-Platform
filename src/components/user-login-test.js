import { UserLogin } from "./user-login";
import { render, screen, fireEvent } from '@testing-library/react';


test("Title Test",()=>{

    render(<UserLogin/>);

    var title= screen.getByTestId('title');

    expect(title).toHaveTextContent('Customer Login');
});

test("Recover Password Link Test",()=>{
    render(<UserLogin/>);

    var link=screen.getByText(/Recover Password/)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("to","/recover-password")

})