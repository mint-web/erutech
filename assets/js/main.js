// main slider
class Slider {
	constructor(name, time) {
		this.init(name, time);
	}
	init(name, time) {
		this.index = 0;
		this.slides = document.querySelectorAll(`${name}`);
		this.timer = setInterval(() => {
			this.autoPlay();
		}, time);
	}
	prevSlide() {
		if (this.index === this.slides.length - 1) {
			this.index--;
		} else {
			this.slides.length - 1;
		}
		this.changeSlide();
		this.sliderText();
	}
	nextSlide() {
		if (this.index === this.slides.length - 1) {
			this.index = 0;
		} else {
			this.index++;
		}
		this.changeSlide();
		this.sliderText();
	}
	changeSlide() {
		this.slides.forEach((slide) => {
			slide.classList.remove('active');
		});
		this.slides[this.index].classList.add('active');
	}
	autoPlay() {
		this.nextSlide();
	}
	sliderText() {
		const current = document.querySelectorAll('.main_visual .pager .current');
		current.forEach((item) => {
			const number = this.index + 1;
			const leadingZero = () => {
				return this.index < 10 ? '0' + number : number
			}
			item.innerText = leadingZero``;
		})
	}
}

class mainVisual extends Slider { }
class mainCaseSlide extends Slider {
	autoPlay() {
		clearInterval(this.timer);
	}
	init(name, time) {
		this.caseInner = document.querySelector('.case_inner');
		this.nextBtn = document.querySelector('.case_slider .btn_next');
		this.prevBtn = document.querySelector('.case_slider .btn_prev');
		this.clickEventHandler();
		super.init(name, time);
	}
	clickEventHandler() {
		this.nextBtn.addEventListener('click', () => {
			this.nextSlide();
			this.caseInner.style.transform = 'translateX(-50%)';
		});
		this.prevBtn.addEventListener('click', () => {
			this.prevSlide();
			this.caseInner.style.transform = 'translateX(0)';
		});
	}
}

// get fetch api
class Fetch {
	constructor(idx) {
		this.init(idx);
	}
	init(idx) {
		this.urlObj = {
			url: {
				0: 'assets/data/product.json',
				1: 'assets/data/certification.json'
			}
		}
		this.getData(this.urlObj.url[idx]);
	}
	async getData(url) {
		this.url = url;
		this.response = await fetch(this.url);
		this.responData = await this.response.json();
		this.template = this.responData.map(item => {
			return this.addTemplteData(item)
		}).join('');
		if (this.url === this.urlObj.url[0]) {
			document.querySelector('.filed_list').innerHTML = this.template;
		} else {
			document.querySelector('.cerfi_wrap .cerfi_list').innerHTML = this.template;
		}
		console.log(this.url)
	}
}

class filedList extends Fetch {
	addTemplteData(item) {
		return `<li>
		<div class="prd_img"><img src="${item.photo}" alt=""></div>
			<p class="prd_txt">${item.title}</p>
		</li>`;
	}
}
class cerfiList extends Fetch {
	addTemplteData(item) {
		return `<li>
		<a href="#none"><img src="${item.photo}"></a>
		</li>`;
	}
}

const main_visual = new mainVisual(`.main_visual .visual`, 7000);
const main_case_slide = new mainCaseSlide(`.case_slider .item`, 7000);
const filed_list = new filedList(0);
const cerfi_list = new cerfiList(1);
