# mission pdfmaker
PDF maker Api


# Api Details

## GET /liveness
```javascript
{
    "data": true
}
```
## GET /readiness
```javascript
{
    "data": true
}
```
## POST /pdfmaker/template
Request Payload: 
```javascript
{
	"data": {
		"template": "This is {{name}} template.",
		"data":{
			"name" : "mission.io"
		}
	}
}
```
Response Payload: 
```javascript
{
    "data": "This is mission.io template."
}

```
## POST /pdfmaker/pdf
Request Payload: 

```javascript
{
	"data": {
		"template": "This is {{name}} template.",
		"data":{
			"name" : "mission.io"
		}
	}
}
```
Response Payload:
```javascript
{
    "data": {
        "type": "Buffer",
        "data": [
            37,
          ...
            70,
            10
        ]
    }
}
```