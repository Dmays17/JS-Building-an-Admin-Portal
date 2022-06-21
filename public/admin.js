async function admin(){
    //Retrieve a list of books from the server.
    const booksListResponse = await fetch("http://localhost:3001/listBooks")
    const bookList = await booksListResponse.json() 
    //Display a list of book titles to the admin.

    //Place a text input next to each book title
    //-Give each text input a value: the quantity of the associated book.
    //Place a submit button next to each text input.
    //When the submit button is clicked, retrieve the quantity from the associated text input and save the updated quantity to the server.
    const ul = document.createElement("ul")

    
    bookList.forEach(function(book){
        const li = document.createElement("li")
        li.textContent = book.title

        const textInput = document.createElement("input")
        textInput.text = "text"
        textInput.value = book.quantity
        li.append(textInput)

        const button = document.createElement("input")
        button.type= "button"
        button.value = "Save"
        button.addEventListener("click", async function() {
            await fetch("http://localhost:3001/updateBook", {
            method: "PATCH",
            headers: {
                "Content-Type":'application/json',
            },
            body: JSON.stringify({
                id: book.id,
                quantity: textInput.value,
            }),
        })
    })
        li.append(button)

        ul.append(li)
    })

    const root = document.querySelector("#root")
    root.append(ul)  
}

admin();
