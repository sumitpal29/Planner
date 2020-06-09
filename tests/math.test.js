// Jest provides test function globally across the project 
// test('string - name for your test', funtion)

// test why
// testing saves time
// easy to maintain function/features in a big project
// creates reusable software
// In future changes, bugs will easily identified.
// flexibility
// - refactoring
// - collabs
// - profiling -> speed check 

const calculateTip = (total, tipPercent = 0.25) => {
    return total + total * tipPercent
}

const F2C = (temp) => {
    return (temp - 32) / 1.8
}

const C2F = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a,b) => {
    return new Promise((res, rej) => {
        setTimeout(()=>res(a+b), 2000)
    })}

test('should calculate tip for a total', () => {
    expect(calculateTip(10)).toBe(12.5)
});

// test('should return farenhite value from celcius', () => {
//     expect(C2F(1)).toBe(33.8)
// })

// test('should return celcius value from farenhite', (done) => {
//     setTimeout(() => {
//         expect(F2C(32)).toBe(0)
//         done()
//     }, 2000);
// })

// test('promise based add fn - should return sum', (done) => {
//     add(1,2).then(res=>{
//         expect(res).toBe(3)
//         done()
//     })
// })

// test('async await based add fn - should return sum', async () => {
//     const res = await add(2,3)
//     expect(res).toBe(5)
// })