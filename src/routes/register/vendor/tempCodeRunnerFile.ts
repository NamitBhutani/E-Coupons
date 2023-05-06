const body = await request.formData();
		const username = body.get('username');
		const email = body.get('email');