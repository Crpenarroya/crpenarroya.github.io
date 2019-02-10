const abel = Barba.BaseTransition.extend({
    start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this))
    },
    fadeOut: function() {
        const oldContainer = this.oldContainer
        return new Promise(function(resolve) {
            anime({
                targets: oldContainer,
                opacity: 0,
                translateY: -100,
                easing: 'easeInCubic',
                duration: 300,
                complete: function() {
                    resolve()
                }
            })
        })
    },
    fadeIn: function() {
        const _this = this
        const oldContainer = this.oldContainer
        const newContainer = this.newContainer
        window.scrollTo(0, 0)
        oldContainer.style.display = 'none'
        newContainer.style.visibility = 'visible'
        newContainer.style.opacity = 0
        newContainer.style.transform = 'translateY(100px)'
        anime({
            targets: newContainer,
            opacity: 1,
            translateY: 0,
            easing: 'easeOutCubic',
            duration: 600,
            complete: function() {
                _this.done()
            }
        })
    },
    valid() {
        const prev = Barba.HistoryManager.prevStatus();

        return prev.namespace === 'abel' && (window.innerWidth > 800);
    }
});



const FadePageTransition = Barba.BaseTransition.extend({
    start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this))
    },
    fadeOut: function() {
        const oldContainer = this.oldContainer
        return new Promise(function(resolve) {
            anime({
                targets: oldContainer,
                opacity: 0,
                translateY: 100,
                easing: 'easeInCubic',
                duration: 300,
                complete: function() {
                    resolve()
                }
            })
        })
    },
    fadeIn: function() {
        const _this = this
        const oldContainer = this.oldContainer
        const newContainer = this.newContainer
        window.scrollTo(0, 0)
        oldContainer.style.display = 'none'
        newContainer.style.visibility = 'visible'
        newContainer.style.opacity = 0
        newContainer.style.transform = 'translateY(100px)'
        anime({
            targets: newContainer,
            opacity: 1,
            translateY: 0,
            easing: 'easeOutCubic',
            duration: 600,
            complete: function() {
                _this.done()
            }
        })
    }
})
Barba.Pjax.getTransition = function() {

    if (abel.valid()) {
    return abel;
    }

    return FadePageTransition
}
document.addEventListener('DOMContentLoaded', function(e) {
    Barba.Pjax.start();
})
Barba.Dispatcher.on('newPageReady', function(e) {
    var nav = document.getElementById('nav'),
        anchor = nav.getElementsByTagName('a'),
        current = window.location.pathname.split('/')[1];
    for (var i = 0; i < anchor.length; i++) {
        anchor[i].className = "";
    }
    for (var i = 0; i < anchor.length; i++) {
        var eval = anchor[i].href.split('/')[3];
        if (eval == current) {
            anchor[i].className = "active";
        }
    }

    lazysizes:
    (function() {
        window.lazySizesConfig = window.lazySizesConfig || {};
        return function() {
            window.lazySizesConfig.expand = 400;
            window.lazySizes.init();
        };
    })
})

// Añadir class al body
Barba.Dispatcher.on('newPageReady', (currentStatus, oldStatus, container, newPageRawHTML) => {
    let regexp = /\<body.*\sclass=["'](.+?)["'].*\>/gi,
        match = regexp.exec(newPageRawHTML);
    if(!match || !match[1]) return;
    document.body.setAttribute('class', match[1]);
});



