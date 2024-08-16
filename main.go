package main

import (
	"fmt"
	"net/http"
	"text/template"
)

func renderTemplate(w http.ResponseWriter, tmpl string) {
    // Define o caminho dos templates
    baseTmpl := "templates/base.html"
    childTmpl := fmt.Sprintf("templates/%s.html", tmpl)

    // Carrega e parseia os templates
    t, err := template.ParseFiles(baseTmpl, childTmpl)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // Executa o template específico (base ou calc2)
    err = t.ExecuteTemplate(w, tmpl, nil)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}



// Manipulador para a página inicial
func baseHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "base")
}

func calc2Handler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "calc2")
}

func main() {
	// Rota para servir arquivos estáticos
	fs := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	//DSADS
	// Rota para a página inicial
	http.HandleFunc("/", baseHandler)
	// Rota para a página secundária de cálculo
	http.HandleFunc("/calc2", calc2Handler)

	// Inicia o servidor
	port := ":8080"
	fmt.Printf("Servidor rodando em http://localhost%s\n", port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Println("Erro ao iniciar o servidor:", err)
	}
}
