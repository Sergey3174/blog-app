export const sanitizeContent = (content) =>
	content
		.replaceAll('&nbsp;', ' ')
		.replace(/ +/g, ' ')
		.replaceAll('<div bis_skin_checked="1">', '\n')
		.replaceAll('<br>', '\n')
		.replaceAll('</div>', '');
