(function() {
    function Slider(opt) {
        if (!opt) {
            throw new Error('请输入参数');
        }

        this.oDiv = opt.oDiv;
        // 指定轮播图所占位置的大小
        this.oDiv.style.height = opt.height || '450px';
        this.oDiv.style.width = opt.width || '100%';

        this.imgs = opt.imgs;
        this.hrefs = opt.hrefs;

        this.ulName = 'slider-ul';
        this.liName = 'slider-li';
        this.navName = 'slider-nav';
        this.navActive = 'slider-active';
        this.btnName = 'slider-btn';

        this.curIndex = 0;
        this.auto_time = null;
        this.time = opt.time || 2000;
        this.len = this.imgs.length;

        this.init();
    }

    Slider.prototype.init = function() {
        this.oDiv.onmouseover = this.stopPlay.bind(this);
        this.oDiv.onmouseout = this.autoPlay.bind(this);

        this.createUl();
        this.createButton();
        this.createNav();
        this.autoPlay();
    }

    Slider.prototype.createUl = function() {
        var oUl = document.createElement('ul');
        oUl.className = this.ulName;

        for (var i = 0; i < this.len; i++) {
            var oLi = document.createElement('li');
            oLi.className = this.liName;

            var oA = document.createElement('a');
            oA.hrefs = this.hrefs[i];
            oA.style.backgroundImage = 'url(' + this.imgs[i] + ')';

            oLi.appendChild(oA)
            oUl.appendChild(oLi);
        }
        oUl.children[0].style.opacity = 1;
        this.oDiv.append(oUl);
    }

    Slider.prototype.createButton = function() {
        var oPre = document.createElement('span');
        oPre.innerHTML = '&lt';
        oPre.className = this.btnName;
        this.oDiv.appendChild(oPre);

        var oNext = document.createElement('span');
        oNext.innerHTML = '&gt';
        oNext.className = this.btnName;
        this.oDiv.appendChild(oNext);

        oPre.onclick = this.preSlider.bind(this);
        oNext.onclick = this.nextSlider.bind(this);
    }

    Slider.prototype.createNav = function() {
        var oUl = document.createElement('ul');
        oUl.classList.add(this.navName);
        oUl.classList.add('clearfix');

        for (var i = 0; i < this.len; i++) {
            var oLi = document.createElement('li');
            oLi.innerHTML = i;
            oUl.appendChild(oLi);
        }

        oUl.children[0].classList.add(this.navActive);
        this.oDiv.appendChild(oUl);

        var oLi = document.querySelectorAll(this.navName + ' li');
        var len = oLi.length;
        var that = this;

        for (var i = 0; i < len; i++) {
            oLi.index = i;
            oLi.onmouseover = function() {
                that.changeSlider(0);
                that.curIndex = this.index;
                that.changeSlider(1);
                that.changeNav();
            }
        }
    }

    Slider.prototype.autoPlay = function() {
        this.auto_time = setInterval(this.nextSlider.bind(this), 2000);
    }

    Slider.prototype.stopPlay = function() {
        clearInterval(this.auto_time);
    }

    Slider.prototype.preSlider = function() {
        this.changeSlider(0);
        --this.curIndex;
        if (this.curIndex < 0) {
            this.curIndex = this.len - 1;
        }
        this.changeSlider(1);
        this.changeNav();
    }

    Slider.prototype.nextSlider = function() {
        this.changeSlider(0);
        ++this.curIndex;
        if (this.curIndex > this.len - 1) {
            this.curIndex = 0;
        }
        this.changeSlider(1);
        this.changeNav();
    }

    Slider.prototype.changeSlider = function(opacity) {
        this.oDiv.querySelectorAll('.slider-ul .slider-li')[this.curIndex].style.opacity = opacity;
    }

    Slider.prototype.changeNav = function() {
        this.oDiv.querySelector('.slider-nav li.slider-active').classList.remove('' + this.navActive);
        this.oDiv.querySelectorAll('.slider-nav li')[this.curIndex].classList.add('' + this.navActive);
    }

    window.Slider = Slider;
})();