import { render,screen } from '@testing-library/react'
import TestComponent from "../../../AdditionalComponents/TestComponents"
import Category from "../CategoryEdit"

describe('category edit test',() =>{
    it('edit category modal is visible or not',()=>{
        render(
            <TestComponent>
                <Category show={true}/>
            </TestComponent>
        )
        const headingCheck = screen.getByText(/edit/i)
        expect(headingCheck).toBeVisible()
    });
    it("checks update button is present in the modal when updateIndex is passed", () => {
        render(
            <TestComponent>
                <Category show={true} updateIndex={1} />
            </TestComponent>
        )
        const updateButton = screen.getByRole("button", { name: /update/i })
        expect(updateButton).toBeVisible()
    })
})