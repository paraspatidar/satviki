pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
        const GITHUB_REPO = 'paraspatidar/satviki';
        const BRANCH = 'main';
        const ACCESS_TOKEN = '';
        const galleryContainer = document.getElementById('gallery-container');
        const loadingState = document.getElementById('loading-state');
        const modal = document.getElementById('myModal');
        const modalImg = document.getElementById('img01');
        const captionText = document.getElementById('caption');
        const closeBtn = document.getElementById('modal-close-btn');
        let pdfDoc = null, pageNum = 1, pageRendering = false, pageNumPending = null, scale = 1.0, maxScale = 3.0, minScale = 0.5;

        function isMobile() {
            return window.innerWidth <= 600 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        async function fetchDocumentsFromGitHub() {
            try {
                loadingState.style.display = 'flex';
                galleryContainer.innerHTML = '';
                const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/${BRANCH}?recursive=1`;
                const headers = ACCESS_TOKEN ? { 'Authorization': `token ${ACCESS_TOKEN}` } : {};
                const response = await fetch(apiUrl, { headers });
                if (!response.ok) throw new Error('Failed to fetch repository structure');
                const data = await response.json();
                const targetFolders = ['tissue-based', 'blood-based', 'mri', 'other'];
                const allowedExtensions = ['.pdf', '.jpeg', '.jpg', '.png'];
                const documents = data.tree
                    .filter(item => {
                        const pathParts = item.path.split('/');
                        return pathParts.length === 2 && 
                               targetFolders.includes(pathParts[0]) && 
                               allowedExtensions.some(ext => item.path.endsWith(ext));
                    })
                    .map(item => {
                        const [folder, filename] = item.path.split('/');
                        const extension = filename.split('.').pop().toLowerCase();
                        const name = filename.replace(/\.[^/.]+$/, '').replace(/-/g, ' ').replace(/_/g, ' ');
                        return {
                            name: name,
                            folder: folder,
                            extension: extension,
                            rawUrl: `https://raw.githubusercontent.com/${GITHUB_REPO}/${BRANCH}/${item.path}`,
                            thumbnail: extension === 'pdf' ? 'pdf-icon' : 
                                     `https://raw.githubusercontent.com/${GITHUB_REPO}/${BRANCH}/${item.path}`
                        };
                    });
                initGallery(documents);
            } catch (error) {
                console.error('Error fetching documents:', error);
                galleryContainer.innerHTML = `
                    <div style="text-align: center; width: 100%; padding: 40px; color: #e74c3c;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                        <h3>Error loading documents</h3>
                        <p>${error.message}</p>
                        <p>Please check your GitHub repository configuration</p>
                    </div>
                `;
            } finally {
                loadingState.style.display = 'none';
            }
        }
        function initGallery(documents) {
            galleryContainer.innerHTML = '';
            documents.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.dataset.folder = item.folder;
                galleryItem.dataset.name = item.name.toLowerCase();
                let thumbnailContent;
                if (item.extension === 'pdf') {
                    thumbnailContent = `<div class="pdf-thumbnail-container" id="thumbnail-${item.name.replace(/\s+/g, '-')}"></div>`;
                } else {
                    thumbnailContent = `<img src="${item.thumbnail}" alt="${item.name}" class="thumbnail" loading="lazy">`;
                }
                galleryItem.innerHTML = `
                    ${thumbnailContent}
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p>${item.extension.toUpperCase()} File</p>
                        <div class="folder-tag">${item.folder.replace('-', ' ')}</div>
                    </div>
                `;
                galleryItem.addEventListener('click', () => openModal(item));
                galleryContainer.appendChild(galleryItem);
                if (item.extension === 'pdf') {
                    const container = galleryItem.querySelector('.pdf-thumbnail-container');
                    generatePdfThumbnail(item.rawUrl, container);
                }
            });
            initSearchAndFilter();
        }
        async function generatePdfThumbnail(pdfUrl, container) {
            try {
                const loadingTask = pdfjsLib.getDocument(pdfUrl);
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 0.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                await page.render({ canvasContext: context, viewport: viewport }).promise;
                canvas.classList.add('pdf-thumbnail');
                container.innerHTML = '';
                container.appendChild(canvas);
                const iconOverlay = document.createElement('div');
                iconOverlay.classList.add('pdf-icon-overlay');
                iconOverlay.innerHTML = '<i class="fas fa-file-pdf"></i>';
                container.appendChild(iconOverlay);
            } catch (error) {
                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                        <i class="fas fa-file-pdf" style="font-size: 50px; color: #e74c3c;"></i>
                        <span style="margin-top: 10px; font-size: 14px; color: #777;">PDF Document</span>
                    </div>
                `;
            }
        }
        function initSearchAndFilter() {
            let currentFocus = -1;
            document.getElementById('search-bar').addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
                const autocompleteList = document.getElementById('autocomplete-list');
                autocompleteList.innerHTML = '';
                currentFocus = -1;
                if (searchTerm.length > 0) {
                    const uniqueSuggestions = new Set();
                    const items = document.querySelectorAll('.gallery-item');
                    items.forEach(item => {
                        const name = item.dataset.name;
                        const folder = item.dataset.folder;
                        if (name.includes(searchTerm)) {
                            if (activeFilter === 'all' || folder === activeFilter) {
                                uniqueSuggestions.add(item.querySelector('h3').textContent);
                            }
                        }
                    });
                    const sortedSuggestions = Array.from(uniqueSuggestions).sort();
                    sortedSuggestions.forEach(suggestion => {
                        const suggestionElement = document.createElement('div');
                        suggestionElement.innerHTML = `<strong>${suggestion.substr(0, searchTerm.length)}</strong>${suggestion.substr(searchTerm.length)}`;
                        suggestionElement.innerHTML += `<input type='hidden' value='${suggestion}'>`;
                        suggestionElement.addEventListener('click', function() {
                            document.getElementById('search-bar').value = suggestion;
                            autocompleteList.innerHTML = '';
                            filterItems(suggestion, activeFilter);
                        });
                        autocompleteList.appendChild(suggestionElement);
                    });
                }
                filterItems(searchTerm, activeFilter);
            });
            document.getElementById('search-bar').addEventListener('keydown', function(e) {
                const autocompleteList = document.getElementById('autocomplete-list');
                const items = autocompleteList.children;
                if (e.key === 'ArrowDown') {
                    currentFocus++;
                    addActive(items);
                } else if (e.key === 'ArrowUp') {
                    currentFocus--;
                    addActive(items);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (currentFocus > -1 && items.length > 0) {
                        if (items[currentFocus]) {
                            items[currentFocus].click();
                        }
                    }
                }
            });
            function addActive(items) {
                if (!items) return false;
                removeActive(items);
                if (currentFocus >= items.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (items.length - 1);
                if (items[currentFocus]) {
                    items[currentFocus].classList.add('autocomplete-active');
                    items[currentFocus].scrollIntoView({ block: 'nearest' });
                }
            }
            function removeActive(items) {
                for (let i = 0; i < items.length; i++) {
                    items[i].classList.remove('autocomplete-active');
                }
            }
            document.addEventListener('click', function(e) {
                if (e.target.id !== 'search-bar') {
                    document.getElementById('autocomplete-list').innerHTML = '';
                }
            });
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    const filterType = this.dataset.filter;
                    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
                    filterItems(searchTerm, filterType);
                });
            });
        }
        function filterItems(searchTerm, filterType) {
            const items = document.querySelectorAll('.gallery-item');
            items.forEach(item => {
                const name = item.dataset.name;
                const folder = item.dataset.folder;
                const matchesSearch = name.includes(searchTerm.toLowerCase());
                const matchesFilter = filterType === 'all' || folder === filterType;
                if (matchesSearch && matchesFilter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        function openModal(item) {
            modal.style.display = "block";
            captionText.innerHTML = item.name;
            if (item.extension === 'pdf') {
                modalImg.style.display = "none";
                document.getElementById('pdf-viewer-container').style.display = "block";
                document.querySelector('.pdf-controls').style.display = "flex";
                loadPdf(item.rawUrl);
                document.getElementById('download-pdf').onclick = function() {
                    window.open(item.rawUrl, '_blank');
                };
            } else {
                modalImg.src = item.rawUrl;
                modalImg.style.display = "block";
                document.getElementById('pdf-viewer-container').style.display = "none";
                document.querySelector('.pdf-controls').style.display = "none";
            }
        }
        function loadPdf(url) {
            document.querySelector('.pdf-loading').style.display = 'block';
            document.getElementById('pdf-canvas').style.display = 'none';
            pageNum = 1;
            scale = isMobile() ? 1.6 : 1.0;
            pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
                pdfDoc = pdfDoc_;
                document.getElementById('page-num').textContent = `1/${pdfDoc.numPages}`;
                document.querySelector('.pdf-loading').style.display = 'none';
                document.getElementById('pdf-canvas').style.display = 'block';
                renderPage(pageNum);
            }).catch(function(error) {
                document.querySelector('.pdf-loading').innerHTML = `
                    <div style="color: #ff6b6b;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Error loading PDF</p>
                    </div>
                `;
            });
        }
        function renderPage(num) {
            pageRendering = true;
            pdfDoc.getPage(num).then(function(page) {
                const viewport = page.getViewport({ scale: scale });
                const canvas = document.getElementById('pdf-canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const renderContext = { canvasContext: context, viewport: viewport };
                const renderTask = page.render(renderContext);
                renderTask.promise.then(function() {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });
            document.getElementById('page-num').textContent = `${num}/${pdfDoc.numPages}`;
            document.getElementById('zoom-level').textContent = `${Math.round(scale * 100)}%`;
        }
        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }
        function closeModal() {
            modal.style.display = "none";
            document.getElementById('pdf-viewer-container').style.display = "none";
            document.querySelector('.pdf-controls').style.display = "none";
            if (pdfDoc) {
                pdfDoc.destroy();
                pdfDoc = null;
            }
        }
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
        closeBtn.onclick = closeModal;
        modal.addEventListener('mousedown', function(e) {
            if (e.target === modal) closeModal();
        });
        document.getElementById('prev-page').addEventListener('click', function() {
            if (pageNum <= 1) return;
            pageNum--;
            queueRenderPage(pageNum);
        });
        document.getElementById('next-page').addEventListener('click', function() {
            if (pageNum >= pdfDoc.numPages) return;
            pageNum++;
            queueRenderPage(pageNum);
        });
        document.getElementById('zoom-in').addEventListener('click', function() {
            if (scale >= maxScale) return;
            scale += 0.1;
            renderPage(pageNum);
        });
        document.getElementById('zoom-out').addEventListener('click', function() {
            if (scale <= minScale) return;
            scale -= 0.1;
            renderPage(pageNum);
        });
        window.onload = fetchDocumentsFromGitHub;