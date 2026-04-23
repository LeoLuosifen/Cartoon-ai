import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun as SunIcon, Wind } from 'lucide-react';
import { cn } from '../utils/cn';

interface WeatherInfoProps {
  isDarkMode: boolean;
}

interface WeatherData {
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
  weatherDescription: string;
  city: string;
}

const WeatherInfo = ({ isDarkMode }: WeatherInfoProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number; city: string }>({
    latitude: 39.9042,
    longitude: 116.4074,
    city: '北京'
  });

  const getWeatherDescription = (code: number): string => {
    const weatherCodes: Record<number, string> = {
      0: '晴天',
      1: '多云',
      2: '阴天',
      3: '阴天',
      45: '雾',
      48: '霾',
      51: '小雨',
      53: '小雨',
      55: '小雨',
      56: '冻雨',
      57: '冻雨',
      61: '中雨',
      63: '中雨',
      65: '大雨',
      66: '冻雨',
      67: '冻雨',
      71: '小雪',
      73: '小雪',
      75: '大雪',
      77: '雪',
      80: '阵雨',
      81: '阵雨',
      82: '暴雨',
      85: '阵雪',
      86: '阵雪',
    };
    return weatherCodes[code] || '未知';
  };

  const getWeatherColor = (description: string): string => {
    const colorMap: Record<string, string> = {
      '晴天': 'text-yellow-500',
      '多云': 'text-blue-400',
      '阴天': 'text-gray-500',
      '雾': 'text-gray-400',
      '霾': 'text-gray-500',
      '小雨': 'text-blue-500',
      '中雨': 'text-blue-600',
      '大雨': 'text-blue-700',
      '暴雨': 'text-blue-800',
      '冻雨': 'text-blue-300',
      '小雪': 'text-blue-200',
      '大雪': 'text-blue-100',
      '雪': 'text-blue-200',
      '阵雨': 'text-blue-500',
      '阵雪': 'text-blue-200',
    };
    return colorMap[description] || 'text-gray-500';
  };

  const getWeatherIcon = (description: string) => {
    switch (description) {
      case '晴天':
        return <SunIcon size={16} />;
      case '多云':
      case '阴天':
        return <Cloud size={16} />;
      case '小雨':
      case '中雨':
      case '大雨':
      case '暴雨':
      case '阵雨':
        return <CloudRain size={16} />;
      case '小雪':
      case '大雪':
      case '雪':
      case '阵雪':
        return <CloudSnow size={16} />;
      default:
        return <Wind size={16} />;
    }
  };

  const fetchUserLocation = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json');
      const data = await response.json();
      if (data.loc) {
        const [latitude, longitude] = data.loc.split(',').map(Number);
        setUserLocation({
          latitude,
          longitude,
          city: data.city || '未知城市'
        });
      }
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min`);
      const data = await response.json();
      
      setWeatherData({
        temperature: data.current_weather.temperature,
        maxTemperature: data.daily.temperature_2m_max[0],
        minTemperature: data.daily.temperature_2m_min[0],
        weatherCode: data.current_weather.weathercode,
        weatherDescription: getWeatherDescription(data.current_weather.weathercode),
        city: userLocation.city,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchUserLocation();
    };
    init();
  }, []);

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userLocation.latitude, userLocation.longitude, userLocation.city]);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} text-xs sm:text-sm`}>
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>加载天气数据...</span>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} text-xs sm:text-sm`}>
        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>无法获取天气数据</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} text-xs sm:text-sm`}>
      <div className={`${getWeatherColor(weatherData.weatherDescription)} flex items-center`}>
        {getWeatherIcon(weatherData.weatherDescription)}
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {weatherData.city}
        </span>
        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {weatherData.temperature}°
        </span>
        <span className={`font-bold ${getWeatherColor(weatherData.weatherDescription)} hidden sm:inline`}>
          {weatherData.weatherDescription}
        </span>
        <span className="font-medium text-red-500 hidden sm:inline">
          H:{weatherData.maxTemperature}°
        </span>
        <span className="font-medium text-blue-500 hidden sm:inline">
          L:{weatherData.minTemperature}°
        </span>
      </div>
    </div>
  );
};

export default WeatherInfo;