import Bar from "../../components/Bar"


function Home() {
  const xData1 = ["vue", "react", "vuex", "mobx"]
  const yData1 = [5, 20, 80, 60]
  const xData2 = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  const yData2 = [5, 20, 36, 10, 10, 20]
  return (
    <div className="home">
      <Bar title={'主流框架使用满意度'} xData={xData1} yData={yData1} style={{ width: "600px", height: "400px" }}></Bar>
      <Bar title={'服饰销量'} xData={xData2} yData={yData2} style={{ width: "600px", height: "400px" }}></Bar>
    </div>
  )
}

export default Home