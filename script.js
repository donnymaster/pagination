const Pagination = Object.create(null, {
   showItems: {
       value: 3, // количество отображаемых элементов на странице
       writable: true
   },
   countElements: {
       value: 0, // количество элементов всего
       writable: true
   },
   countPages: {
       value: 0, // количество страниц
       writable: true
   },
   items: {
       value: [], // элементы 
       writable: true
   },
   wrapped: {
       value: '', // обвертка элементов
       writable: true
   },
   shell: {
    value: '', // обвертка всего
    writable: true
   },
   clickNav: {
    value: function(event){
           if(this.countPages <= 4){
            if(event.target.classList.contains('num')){
                this.outputElements(+event.target.textContent);
            }
           }else{
            if(event.target.classList.contains('num')){
                this.outputElements(+event.target.textContent);
            }else if(event.target.classList[0] == "start"){
                this.outputElements();
            }else if(event.target.classList[0] == "end"){
                this.outputElements(this.countPages);
            }
           }
    }
   },
   manyNavEnd: {
    value: function (nav){
        let numStart = nav.querySelector('.num-start');
        let numCenter = nav.querySelector('.num-center');
        let numEnd = nav.querySelector('.num-end');
        let dots = nav.querySelector('.tree-dots');

        if(!dots.classList.contains('num')){
            numStart.textContent = +numStart.textContent + 1;
            numCenter.textContent = +numCenter.textContent + 1;
            numEnd.textContent = +numEnd.textContent + 1;

            if(+numEnd.textContent == (this.countPages - 1) || +numEnd.textContent == this.countPages){
                dots.textContent = '';
                dots.textContent = this.countPages;
                dots.classList.add('num');
                numEnd.classList.remove('num-end');
                nav.removeChild(nav.querySelectorAll('.num')[4]);
            }
        }
    }
   },
   manyNavStart: {
    value: function (nav) {
        let numStart = nav.querySelector('.num-start');
        let numCenter = nav.querySelector('.num-center');
        let numEnd = nav.querySelector('.num-end');
        let dots = nav.querySelector('.tree-dots');

        if(dots.classList.contains('num')){
            dots.classList.remove('num');
            dots.textContent = '';
            dots.textContent = '. . .';
            nav.querySelectorAll('.num')[2].classList.add('num-end');
            numStart.textContent = +numStart.textContent - 1;
            numCenter.textContent = +numCenter.textContent - 1;
            let varEnd = nav.querySelector('.num-end');
            varEnd.textContent = +varEnd.textContent - 1;
            let newEnd = document.createElement('div');
            newEnd.classList.add('num');
            newEnd.textContent = this.countPages;
            nav.insertBefore(newEnd, nav.querySelector('.end'));
        }else{
            if(numStart.textContent != '1'){
            numStart.textContent = +numStart.textContent - 1;
            numCenter.textContent = +numCenter.textContent - 1;
            numEnd.textContent = +numEnd.textContent - 1;
            }
        }


    }
   },
   navGenerator: {
        value: function (){
            let nav = '';

            if(this.countPages <= 4){
                let strHtml = '';
                nav = document.createElement('div');
                nav.addEventListener('click', this.clickNav.bind(this));
                nav.classList.add('nav-generator');
                for(let i = 1; i <= this.countPages; i++){
                    strHtml += `<div class="num">${i}</div>`;
                }
                nav.innerHTML += strHtml;
            }else{
                let manyNav = '';
                nav = document.createElement('div');
                nav.addEventListener('click', this.clickNav.bind(this));
                nav.classList.add('nav-generator');
                manyNav = `<div class="start">Начало</div>`;
                manyNav += `<div class="num num-start">1</div>
                           <div class="num num-center">2</div>
                           <div class="num num-end">3</div>`;
                manyNav += `<div class="tree-dots">. . .</div>`;
                manyNav += `<div class="num">${this.countPages}</div>`;
                manyNav += `<div class="end">Конец</div>`;

                nav.innerHTML = manyNav;
                nav.querySelector('.num-end').addEventListener('click', () => setTimeout(this.manyNavEnd.bind(this, nav), 0));
                nav.querySelector('.num-start').addEventListener('click', () => setTimeout(this.manyNavStart.bind(this, nav), 0));

            }
            this.shell.appendChild(nav);
        }
   },
   outputElements: {
       value: function (page = 1){
            this.wrapped.innerHTML = '';
            let start = (page * this.showItems) - this.showItems;
            let end = (start + this.showItems);
            let newArray = this.items.slice(start, end);
            for(const item of newArray){
                this.wrapped.appendChild(item);
            }
       }
   },
   init: {
       value: function (_shell = null, _wrapped = null, _countElements = null){
           if(_shell == null || _wrapped == null || _countElements == null){
               console.error('Вы ввели не все аргументы!');
               return;
           }
           this.shell = document.querySelector(_shell);
           this.wrapped = document.querySelector(_wrapped);
           this.showItems = _countElements;
           this.countElements = this.wrapped.children.length;
           this.countPages = Math.ceil(this.countElements / this.showItems);

           this.items = [...this.wrapped.children];
           this.navGenerator();
           this.outputElements();
       }
   }
});