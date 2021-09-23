import reducer, { initialStateOfUser, resetUserState, setUser } from '../UserSlice'

it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialStateOfUser)
})

it("should set the user", () => {
    expect(reducer(initialStateOfUser, setUser({ email: "test@test.com" }))).toEqual({
        userObj: {  email: "test@test.com" }, isSuccess: true,invalidLoginMessage: "",
        isLoading: false,
        isError: "", getUsers: []
    })
})

it("should reset the user", () => {
    expect(reducer({
        userObj: { name: "testUser", email: "test@test.com" }, isSuccess: true,
        isLoading: false,
        isError: "", getUsers: []
    }, resetUserState())).toEqual(initialStateOfUser)
})