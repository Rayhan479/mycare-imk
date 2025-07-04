import LoginPresenter from "../presenter/login-presenter.js";
import {
    createPageLoadingTemplate,
    handlePageTransition,
} from "../../utils/index.js";
import AuthAPI from "../../utils/auth-api.js";
import { setAuth } from "../../utils/auth-utils.js";

export default class LoginPage {
    /**
     * Mengembalikan HTML untuk halaman login (form & status).
     * @returns {string}
     */
    async render() {
        return `
      <section class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          <div class="text-center">
            <h2 class="text-3xl font-bold bg-linear-to-l from-[#00C6FF] to-[#0084FF] bg-clip-text text-transparent">MyCare AI</h2>
            <h1 class="mt-2 text-2xl font-semibold text-gray-900">Login</h1>
          </div>

          <form id="login-form" class="mt-8 space-y-6" autocomplete="on">
            <div class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1 relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autocomplete="email"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center">
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" class="text-sm text-blue-600 hover:text-blue-500">Lupa password?</a>
                </div>
                <div class="mt-1 relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autocomplete="current-password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-linear-to-l from-[#00C6FF] to-[#0084FF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </form>

          <div id="status-container" class="mt-4"></div>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">atau login dengan</span>
              </div>
            </div>

            <div class="mt-6">
              <button
                id="btn-google"
                class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Login dengan Google
              </button>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Belum punya akun?
              <a href="#/register" id="register-link" class="font-medium text-blue-600 hover:text-blue-500">
                Register
              </a>
            </p>
          </div>
        </div>
      </section>
    `;
    }

    /**
     * Setelah render, kita pasang event listener untuk form submit, register link, dan Google button.
     */
    async afterRender() {
        await handlePageTransition(async () => {
            // Hapus page‐loading jika ada
            const loadingEl = document.querySelector(".page-loading");
            if (loadingEl) loadingEl.remove();

            const loginForm = document.querySelector("#login-form");
            const statusContainer = document.querySelector("#status-container");
            const registerLink = document.querySelector("#register-link");
            const googleButton = document.querySelector("#btn-google");

            // Jika klik "Register" → tampilkan page loading dan ganti rute
            if (registerLink) {
                registerLink.addEventListener("click", async (e) => {
                    e.preventDefault();
                    document.body.insertAdjacentHTML(
                        "beforeend",
                        createPageLoadingTemplate()
                    );
                    window.location.hash = "#/register";
                });
            }

            // Jika klik tombol Google → langsung redirect ke endpoint Google
            if (googleButton) {
                googleButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    AuthAPI.loginWithGoogle();
                });
            }

            // Inisialisasi presenter
            const presenter = new LoginPresenter({
                view: {
                    showLoading: () => {
                        statusContainer.innerHTML = `
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                          <div class="flex items-center">
                            <div class="flex-shrink-0">
                              <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </div>
                            <div class="ml-3">
                              <p class="text-sm text-blue-700">Memproses...</p>
                            </div>
                          </div>
                        </div>`;
                        loginForm.querySelector(
                            'button[type="submit"]'
                        ).disabled = true;
                    },
                    showError: (message) => {
                        statusContainer.innerHTML = `<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                          <div class="flex items-center">
                            <div class="flex-shrink-0">
                              <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                              </svg>
                            </div>
                            <div class="ml-3">
                              <p class="text-sm text-red-700">${message}</p>
                            </div>
                          </div>
                        </div>`;
                        loginForm.querySelector(
                            'button[type="submit"]'
                        ).disabled = false;
                    },
                    showSuccess: () => {
                        statusContainer.innerHTML = `
                        <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                          <div class="flex items-center">
                            <div class="flex-shrink-0">
                              <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                              </svg>
                            </div>
                            <div class="ml-3">
                              <p class="text-sm text-green-700">Login berhasil! Mengalihkan ke halaman utama...</p>
                            </div>
                          </div>
                        </div>
                        `;
                        loginForm.reset();
                        loginForm.querySelector(
                            'button[type="submit"]'
                        ).disabled = true;

                        // Beri tahu aplikasi bahwa status auth berubah
                        document.dispatchEvent(new Event("authChanged"));

                        // Tampilkan page loading sebelum pindah ke home
                        document.body.insertAdjacentHTML(
                            "beforeend",
                            createPageLoadingTemplate()
                        );
                        setTimeout(() => {
                            window.history.replaceState(
                                {},
                                "",
                                window.location.pathname
                            );
                            window.location.hash = "#/"; // Arahkan ke halaman utama
                        }, 1000);
                    },
                },
                authAPI: AuthAPI,
                authUtils: { setAuth },
            });

            // Pasang event listener form submit
            if (loginForm) {
                loginForm.addEventListener("submit", (event) => {
                    event.preventDefault();

                    const email = document.querySelector("#email").value.trim();
                    const password = document
                        .querySelector("#password")
                        .value.trim();

                    // Validasi sederhana
                    if (!email || !password) {
                        statusContainer.innerHTML = `
                        <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                          <div class="flex">
                            <div class="ml-3">
                              <p class="text-sm text-red-700">Email dan password harus diisi.</p>
                            </div>
                          </div>
                        </div>`;
                        return;
                    }

                    const formData = { email, password };
                    presenter.login(formData);
                });
            }
        });
    }
}
