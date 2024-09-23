import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions,GEO_API_URL } from '../../api';

const Search = ({onSearchChange}) =>{
   //一个状态变量 search，用于存储当前搜索的值
   //useState 允许你在函数组件中声明状态变量。
   //每当状态变量的值发生变化时，组件会重新渲染，以反映最新的状态
   const [search,setsearch] = useState(null);

   const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
    /*
    fetch函数用于发送HTTP请求。在这里，它发送一个GET请求到地理API。
     GEO_API_URL是地理API的基础URL。
    ?minPopulation=1000000&namePrefix=${inputValue}是查询参数，用于过滤和搜索城市。
    minPopulation=1000000表示只返回人口超过100万的城市，
    namePrefix=${inputValue}表示只返回名称以用户输入的城市名称前缀开头的城市。
    */
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

   const handleOnChange = (searchData) =>{
    setsearch(searchData);       // 更新组件内部的状态
    onSearchChange(searchData);   // 调用传入的回调函数
    // Search 组件接收到的 onSearchChange 属性，这个属性是一个函数，它是由父组件传递进来的。
    //当 handleOnChange 被调用时，它也会触发父组件中的这个函数。
   };

    return (
        //异步组件
        <AsyncPaginate
           placeholder="Search for a city"//用于在下拉框中显示提示文字，指导用户可以搜索城市
           debounceTimeout={600}//防抖是一种性能优化手段，它意味着在用户停止输入一定时间后（这里是 500 毫秒），才会触发数据的加载。这样可以减少因为用户输入过快而导致的频繁请求
           value = {search}
           onChange ={handleOnChange}
           loadOptions={loadOptions}
           
        />
    );
};

export default Search;



/*
fetch函数返回一个Promise对象，这是一个特殊的对象，代表了一个异步操作的最终完成（或失败）及其结果值。Promise对象有三种状态：

pending：初始状态，既不是成功，也不是失败状态。
fulfilled：意味着操作成功完成。
rejected：意味着操作失败。
fetch函数发送一个网络请求，并返回一个Promise对象，这个Promise对象在请求成功完成时会被解析（resolve），在请求失败时会被拒绝（reject）。

.then方法是Promise对象的一个方法，用于指定当Promise对象被解析（resolve）时要执行的回调函数。.then方法可以链式调用，以便在Promise对象被解析后执行一系列操作。


fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


*/
