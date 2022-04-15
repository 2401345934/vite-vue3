{
  (function () {
    let sum = [0]
    console.time("aaaaa")
    for (let i = 0; i <= 1000; i++) {
      sum[0] += i
    }
    console.log(sum);
    console.timeEnd("aaaaa")
  })()

}
{

  (function () {
    let sum = [0]
    let tmp = 0
    console.time("bbbbb")
    for (let i = 0; i <= 1000; i++) {
      tmp += i
    }
    sum[0] = tmp
    console.log(sum);
    console.timeEnd("bbbbb")
  })()
}