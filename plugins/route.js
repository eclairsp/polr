export default ({ app }) => {
    app.router.afterEach((to, from) => {
        try {
            const wave1 = document.querySelector("#wave1");
            const wave2 = document.querySelector("#wave2");
            const wave3 = document.querySelector("#wave3");
            wave1.style.animationDuration = ".5s";
            wave2.style.animationDuration = ".6s";
            wave3.style.animationDuration = ".7s";

            setTimeout(() => {
                wave1.style.animationDuration = "3s";
                wave2.style.animationDuration = "5s";
                wave3.style.animationDuration = "7s";
            }, 500);
        } catch (error) {
            if (!(error instanceof ReferenceError)) {
                console.error(error);
            }
        }
    });
};
