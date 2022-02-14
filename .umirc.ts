import { defineConfig } from 'dumi';

export default defineConfig({
	base: '/blog',
	publicPath: '/blog/',
	title: '小李同学',
	// favicon:
	// 	'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
	favicon: 'http://www.ilixin.top/media/images/avatar-dark.png',
	// logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
	logo: 'http://www.ilixin.top/media/images/avatar-color.png',
	outputPath: 'docs-dist',
	mode: 'site',
	navs: [
		// null, // null 值代表保留约定式生成的导航，只做增量配置
		{
			title: '前端',
			path: '/web',
		},
		{
			title: '服务端',
			path: '/server',
		},
		{
			title: '面试题',
			path: '/interview',
		},
		{
			title: '软技能',
			path: '/soft-skills',
		},
		{
			title: 'GitHub',
			path: 'https://github.com/weblixin/blog',
		},
	],
	// more config: https://d.umijs.org/config
});
