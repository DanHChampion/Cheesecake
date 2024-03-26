class FakeDirent {
	constructor(name, isDirectory = false) {
		this.name = name;
		this.isDirectory = () => isDirectory;
	}
}

module.exports = FakeDirent;