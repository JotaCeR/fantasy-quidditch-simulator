class Mocks {

    fakeCallback = () => {
        let called = false;
        if (!called) {
            called = true
        }
        return called
    }
}

module.exports = new Mocks()