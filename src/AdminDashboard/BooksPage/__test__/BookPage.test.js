import { render,screen } from '@testing-library/react'
import TestComponent from "../../../AdditionalComponents/TestComponents"
import Book from "../EditBook"

describe('category edit test',() =>{
    it('edit category modal is visible or not',()=>{
        render(
            <TestComponent>
                <Book show={true}/>
            </TestComponent>
        )
        const headingCheck = screen.getByText(/edit/i)
        expect(headingCheck).toBeVisible()
    });
})