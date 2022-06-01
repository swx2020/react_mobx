import { useRef, useEffect } from "react";
import * as echarts from "echarts";
// 函数组件默认会有一个props参数，内部包含了从外部传入的参数
// 可以通过【解构】的方式取出 【props参数对象】中 需要的值
function Bar( { title, xData, yData, style } ) {
  const barRef = useRef();


  // dom节点挂载完成后，才能拿到真实dom元素！！！！
  // 所以这里要在useEffect钩子函数中操作
  useEffect(() => {
    // 1 获取dom节点，实例化echarts对象
    const myecharts = echarts.init(barRef.current);

    // 2 定义配置项
    const options = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "bar",
          name: "柱状图",
          data: yData,
        },
      ],
    };

    // 3 将配置项设置给echarts实例对象
    myecharts.setOption(options);
    // 在回调函数中使用的依赖项，最好在数组中进行声明，例如这里的userStore
  }, [title, xData, yData]);

  return (
    <div className="bar">
      {/* echarts挂载点 */}
      <div ref={barRef} style={style}></div>
    </div>
  );
}

export default Bar
